
export class AvaliadorConsultarDto implements IAvaliadorConsultarDto {
    situation: string
    evaluatorName: string
    formationName: string
    description: string
}

export interface IAvaliadorConsultarDto {
    situation: string
    evaluatorName: string
    formationName: string
    description: string
}