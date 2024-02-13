using System.ComponentModel.DataAnnotations.Schema;

namespace URLService.Entities;

[Table("VisitLogs")]

public class VisitLog {
    public Guid Id {get; set;}
    public DateTime CreatedAt {get; set;} = DateTime.UtcNow;
    public string UserAgent {get; set;}
    public string IPAddress {get; set;}
    public string Continent {get; set;}
    public string Country {get; set;}
    public string Region {get; set;}
    public string City {get; set;}
    public string ISP {get; set;}
    public string Coordinates {get; set;}
    public string Org {get; set;}

    /* Nav Properties */
    public URL URL {get; set;}
}