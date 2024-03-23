using URLService.Data;

namespace URLService.Services;

public class TrackingService
{
    private readonly UrlDbContext _context;
    public TrackingService(UrlDbContext context)
    {
        _context = context;
    }

    public string GenerateUniqueTrackingId()
    {
        string trackingId;
        do
        {
            trackingId = Guid.NewGuid().ToString("N").Substring(0, 6);
        } while (TrackingIdExists(trackingId));

        return trackingId;
    }

    public bool TrackingIdExists(string trackingId)
    {
        return _context.URLs.Any(u => u.TrackingId == trackingId);
    }
}
