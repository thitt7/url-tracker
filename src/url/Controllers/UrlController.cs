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
    public async Task<ActionResult<UrlDto>> GetUrlById(Guid id)
    {
        var url = await _context.URLs
            .Include(url => url.VisitLogs)
            .FirstOrDefaultAsync(url => url.Id == id);

        return _mapper.Map<UrlDto>(url);
    }
    [HttpPost]
    public async Task<ActionResult<UrlDto>> CreateUrl(CreateUrlDto urlDto)
    {
        Console.WriteLine("hitting POST endpoint!!");
        var url = _mapper.Map<URL>(urlDto);
        
        var newTrackingId = _trackingService.GenerateUniqueTrackingId();

        url.TrackingId = newTrackingId;
        url.TrackingURL = $"https://exampledomain/track/{newTrackingId}";

        _context.URLs.Add(url);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("could not save changes to db");

        return CreatedAtAction(nameof(GetUrlById), new {url.Id}, _mapper.Map<UrlDto>(url));
    }
}
