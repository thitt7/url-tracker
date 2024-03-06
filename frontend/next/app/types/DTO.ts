export type UrlDto = {
    id: string;
    trackingId: string;
    originalURL: string;
    trackingURL: string;
    createdAt: Date | string;
    visitLogs: VisitLogDto[];
}

export type UpdateUrlDto = {
    trackingId?: string;
    originalURL?: string;
}

export type IpData = {
    Continent?: string;
    Country?: string;
    Region?: string;
    City?: string;
    ISP?: string;
    Coordinates?: string;
    Org?: string;
}

export type VisitLogDto = IpData & {
    // id: string;
    CreatedAt: Date | string;
    UserAgent?: string;
    IPAddress?: string;
}