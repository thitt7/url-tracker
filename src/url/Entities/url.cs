namespace URLService.Entities;

public class URL {
    public Guid Id {get; set;}
    public string TrackingId {get; set;}
    public string OriginalURL {get; set;}
    public string TrackingURL {get; set;}
    public DateTime CreatedAt {get; set;} = DateTime.UtcNow;

    // Navigation property for visitor log
    public List<VisitLog> VisitLogs { get; set; }
    public Guid URLId { get; set; }
}