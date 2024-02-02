using System.ComponentModel.DataAnnotations;
namespace URLService.DTOs;

public class UpdateUrlDto
{
    public string TrackingId {get; set;}
    public string OriginalURL { get; set; }
}
