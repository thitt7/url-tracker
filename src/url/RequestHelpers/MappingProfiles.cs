using AutoMapper;
using URLService.DTOs;
using URLService.Entities;

namespace URLService.RequestHelpers;

public class MappingProfiles: Profile
{
    public MappingProfiles() {
        // CreateMap<URL, UrlDto>().IncludeMembers(x => x.VisitLogs);
        // CreateMap<VisitLog, VisitLogDto>();
        // CreateMap<VisitLog, UrlDto>();
        // CreateMap<CreateUrlDto, URL>()
        //     .ForMember(d => d.VisitLogs, o => o.MapFrom(s => s));
        // CreateMap<CreateUrlDto, VisitLog>();

        // CreateMap<UrlDto, AuctionCreated>();
        // CreateMap<URL, AuctionUpdated>().IncludeMembers(a => a.VisitLogs);
        // CreateMap<VisitLog, AuctionUpdated>();

        CreateMap<URL, UrlDto>().IncludeMembers(x => x.VisitLogs);
        CreateMap<VisitLog, VisitLogDto>();
        CreateMap<CreateUrlDto, URL>(); // Mapping from CreateUrlDto to URL entity

        // Mapping from CreateUrlDto to VisitLog entity
        CreateMap<CreateUrlDto, VisitLogDto>();
            // .ForMember(d => d.CreatedAt, opt => opt.MapFrom(s => DateTime.UtcNow))
            // .ForMember(d => d.UserAgent, opt => opt.MapFrom(s => "defaultUserAgent"))
            // .ForMember(d => d.IPAddress, opt => opt.MapFrom(s => "defaultIPAddress"))
            // .ForMember(d => d.Continent, opt => opt.MapFrom(s => "defaultContinent"))
            // .ForMember(d => d.Country, opt => opt.MapFrom(s => "defaultCountry"))
            // .ForMember(d => d.Region, opt => opt.MapFrom(s => "defaultRegion"))
            // .ForMember(d => d.City, opt => opt.MapFrom(s => "defaultCity"))
            // .ForMember(d => d.ISP, opt => opt.MapFrom(s => "defaultISP"))
            // .ForMember(d => d.Coordinates, opt => opt.MapFrom(s => "defaultCoordinates"))
            // .ForMember(d => d.Org, opt => opt.MapFrom(s => "defaultOrg"));

        CreateMap<UpdateUrlDto, URL>(); // Mapping from UpdateUrlDto to URL entity
    }

}
