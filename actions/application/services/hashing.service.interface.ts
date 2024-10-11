export interface IHashingService {
  hashIp(ip?: string): Promise<string | undefined>;
}