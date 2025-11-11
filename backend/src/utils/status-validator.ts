import { StatusDemandaType } from "../types/demanda.types";

export class StatusValidator {
  private static validTransitions: Record<
    StatusDemandaType,
    StatusDemandaType[]
  > = {
    PLANEJAMENTO: ["EM_ANDAMENTO"],
    EM_ANDAMENTO: ["PLANEJAMENTO", "CONCLUIDO"],
    CONCLUIDO: [],
  };

  static canTransition(
    from: StatusDemandaType,
    to: StatusDemandaType
  ): boolean {
    if (from === to) return true;
    return this.validTransitions[from].includes(to);
  }

  static validateTransition(
    from: StatusDemandaType,
    to: StatusDemandaType
  ): void {
    if (!this.canTransition(from, to)) {
      throw new Error(
        `Transição de status inválida: não é possível mudar de ${from} para ${to}`
      );
    }
  }

  static getValidTransitions(from: StatusDemandaType): StatusDemandaType[] {
    return this.validTransitions[from];
  }
}
