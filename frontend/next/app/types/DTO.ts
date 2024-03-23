export type UrlDto = {
    id: string;
    trackingId: string;
    originalURL: string;
    trackingURL: string;
    createdAt: string;
    visitLogs: VisitLogDto[];
}

export type createUrlDto = {
    originalURL: string;
  }

export type UpdateUrlDto = {
    trackingId?: string;
    originalURL?: string;
}

export type IpData = {
    continent?: string;
    country?: string;
    region?: string;
    city?: string;
    isp?: string;
    coordinates?: string;
    org?: string;
}

export type VisitLogDto = IpData & {
    // id: string;
    createdAt: string;
    userAgent?: string;
    ipAddress?: string;
}