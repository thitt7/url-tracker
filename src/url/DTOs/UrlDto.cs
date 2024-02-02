namespace URLService.DTOs;

public class UrlDto
{
    public string TrackingId {get; set;}
    public string OriginalURL { get; set; }
    public string TrackingURL { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<VisitLogDto> VisitLogs { get; set; }
}
