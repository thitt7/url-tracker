using System.ComponentModel.DataAnnotations;
namespace URLService.DTOs;

public class CreateUrlDto
{
    [Required]
    public string OriginalURL { get; set; }
}
