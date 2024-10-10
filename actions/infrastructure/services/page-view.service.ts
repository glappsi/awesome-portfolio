import { injectable } from 'inversify';
import { IPageViewService } from '../../application/services/page-view.service.interface';

@injectable()
export class PageViewService implements IPageViewService {
  async hashIp(ip?: string): Promise<string | undefined> {
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(ip),
    );
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
}