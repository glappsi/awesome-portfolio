import { injectable } from 'inversify';
import { IHashingService } from '../../application/services/hashing.service.interface';

@injectable()
export class NativeHashingService implements IHashingService {
  async hashIp(ip?: string): Promise<string | undefined> {
    if (!ip) {
      return;
    }

    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(ip),
    );
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
}