
import { MoreThanOrEqual } from 'typeorm';
import { AppDataSource } from '../../database/index';
import { getSequence } from '../../shared/utils';
import { ProcuracaoEntity } from '../models/entities/procuracao.entity';

export class ProcuracaoRepository implements IProcuracaoRepository {
    find(procuracao: ProcuracaoEntity): Promise<ProcuracaoEntity[]> {
        return AppDataSource.manager.find(ProcuracaoEntity, { where: procuracao });
    }

    async findOne(procuracao: ProcuracaoEntity): Promise<ProcuracaoEntity> {
        return await AppDataSource.manager.findOne(ProcuracaoEntity, { where: procuracao });
    }

    async save(procuracao: ProcuracaoEntity): Promise<ProcuracaoEntity> {
        procuracao.codProcuracao = await getSequence('S_INTERESSADO_PROCURACAO');
        return await AppDataSource.manager.save(procuracao);
    }

    async findConsultarProcuracao(procuracao: ProcuracaoEntity): Promise<ProcuracaoEntity[]>{
        return await AppDataSource.manager.findBy(ProcuracaoEntity, {
            dtVigencia: MoreThanOrEqual(new Date())
        })
    }
}

export interface IProcuracaoRepository {
    find(procuracao: ProcuracaoEntity): Promise<ProcuracaoEntity[]>;
    findOne(procuracao: ProcuracaoEntity): Promise<ProcuracaoEntity>;
    save(procuracao: ProcuracaoEntity): Promise<ProcuracaoEntity>;
}
 