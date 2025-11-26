export interface DashboardData {
  mesActual: number;
  mesAnterior: number;
  mesRatioDif: number;
  topMedico: TopMedico[];
}

export interface TopMedico {
  medico: string;
  total: number;
}