export interface IPageViewService {
  hashIp(ip?: string): Promise<string | undefined>;
}