using URLService.Data;

namespace URLService.Services;

public class TrackingService
{
    private readonly UrlDbContext context;
    public TrackingService(UrlDbContext _context)
    {
        context = _context;
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
        return context.URLs.Any(u => u.TrackingURL == trackingId);
    }
}
