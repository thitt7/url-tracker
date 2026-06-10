using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using URLService.Data;
using URLService.DTOs;
using URLService.Entities;
using URLService.Services;

namespace URLService.Controllers;

[ApiController]
[Route("api/urls/visit")]
public class VisitLogController: ControllerBase
{
    private readonly UrlDbContext _context;
    private readonly IMapper _mapper;
    private readonly TrackingService _trackingService;
    public VisitLogController(UrlDbContext context, IMapper mapper, TrackingService trackingService)
    {
        _context = context;
        _mapper = mapper;
        _trackingService = trackingService;
    }

    // [HttpGet]
    // public async Task<ActionResult<List<UrlDto>>> GetAllUrls()
    // {
    //     Console.WriteLine("hitting api endpoint");
    //     var urls = await _context.URLs
    //         .Include(url => url.VisitLogs)
    //         .ToListAsync();

    //     return _mapper.Map<List<UrlDto>>(urls);
    // }

    [HttpPut("{trackingId}")]
    public async Task<ActionResult<UrlDto>> AddVisitLog(string trackingId, VisitLogDto visitLogDto)
    {
        var url = await _context.URLs
            .Include(url => url.VisitLogs)
            .FirstOrDefaultAsync(url => url.TrackingId == trackingId);
        
        if (url == null) return NotFound();

        var visitLog = _mapper.Map<VisitLog>(visitLogDto);
        url.VisitLogs.Add(visitLog);

        var result = await _context.SaveChangesAsync() > 0;
        if (result) return Ok();

        // return _mapper.Map<UrlDto>(url);
        return BadRequest("could not update visit log");
    }
}
