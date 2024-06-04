using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using URLService.Data;
using URLService.DTOs;
using URLService.Entities;
using URLService.Services;

namespace URLService.Controllers;

[ApiController]
[Route("api/urls")]
public class UrlController: ControllerBase
{
    private readonly UrlDbContext _context;
    private readonly IMapper _mapper;
    private readonly TrackingService _trackingService;
    public UrlController(UrlDbContext context, IMapper mapper, TrackingService trackingService)
    {
        _context = context;
        _mapper = mapper;
        _trackingService = trackingService;
    }

    [HttpGet]
    public async Task<ActionResult<List<UrlDto>>> GetAllUrls()
    {
        Console.WriteLine("hitting api endpoint");
        var urls = await _context.URLs
            .Include(url => url.VisitLogs)
            .ToListAsync();

        return _mapper.Map<List<UrlDto>>(urls);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UrlDto>> GetUrlById(string id)
    {
        var url = await _context.URLs
            .Include(url => url.VisitLogs)
            .FirstOrDefaultAsync(url => url.TrackingId == id);

        return _mapper.Map<UrlDto>(url);
    }
    [HttpPost]
    public async Task<ActionResult<UrlDto>> CreateUrl(CreateUrlDto urlDto)
    {
        string DOMAIN = Environment.GetEnvironmentVariable("DOMAIN");

        var url = _mapper.Map<URL>(urlDto);
        
        var newTrackingId = _trackingService.GenerateUniqueTrackingId();

        url.TrackingId = newTrackingId;
        url.TrackingURL = $"https://{DOMAIN}/{newTrackingId}";

        _context.URLs.Add(url);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("could not save changes to db");

        return CreatedAtAction(nameof(GetUrlById), new {url.Id}, _mapper.Map<UrlDto>(url));
    }

    [HttpPut("{trackingId}")]
    public async Task<ActionResult> UpdateUrl(string trackingId, UpdateUrlDto updateUrlDto)
    {
        string DOMAIN = Environment.GetEnvironmentVariable("DOMAIN");

        var url = await _context.URLs
            .Include(url => url.VisitLogs)
            .FirstOrDefaultAsync(url => url.TrackingId == trackingId);

        if (url == null) return NotFound();

        if (!string.IsNullOrEmpty(updateUrlDto.TrackingId))
        {
            var idExists = _trackingService.TrackingIdExists(updateUrlDto.TrackingId);
            if (idExists) {return Conflict();}
            url.TrackingURL = $"https://{DOMAIN}/track/{updateUrlDto.TrackingId}";
        }

        url.TrackingId = updateUrlDto.TrackingId ?? url.TrackingId;
        url.OriginalURL = updateUrlDto.OriginalURL ?? url.OriginalURL;

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("could not save changes to db");

        return Ok(_mapper.Map<UrlDto>(url));
    }
}
