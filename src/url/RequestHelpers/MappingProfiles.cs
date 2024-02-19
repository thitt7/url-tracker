using AutoMapper;
using URLService.DTOs;
using URLService.Entities;

namespace URLService.RequestHelpers;

public class MappingProfiles: Profile
{
    public MappingProfiles() {
        
        CreateMap<URL, UrlDto>()
            .ForMember(dest => dest.VisitLogs, opt => opt.MapFrom(src => src.VisitLogs));

        CreateMap<VisitLog, VisitLogDto>();
        CreateMap<VisitLogDto, VisitLog>();

        CreateMap<CreateUrlDto, URL>();
        CreateMap<CreateUrlDto, VisitLogDto>();

        CreateMap<UpdateUrlDto, URL>();
    }

}
