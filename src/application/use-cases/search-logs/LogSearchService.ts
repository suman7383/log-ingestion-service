import { LogRepository } from "#domain/log/LogRepository.js";
import { SearchParams } from "#shared/types/index.js";

export class LogSearchService {
  private logRepository: LogRepository;

  constructor(logRepo: LogRepository) {
    this.logRepository = logRepo;
  }

  search = async (params: SearchParams) => {
    const logs = await this.logRepository.search(params);

    return logs;
  };
}
