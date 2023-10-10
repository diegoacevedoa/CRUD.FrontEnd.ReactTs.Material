import { mapper } from "../../helpers/helpers";

export interface IHeadColumn {
  label: string;
  name: string;
  format: Function;
  type: string;
  editable: boolean;
}

export interface IHeadRow {
  columns: IHeadColumn[];
}

export const mapHeadPersona: IHeadRow = {
  columns: [
    {
      label: "Acciones",
      name: "acciones",
      format: mapper,
      type: "text",
      editable: false,
    },
    {
      label: "NoDocumento",
      name: "noDocumento",
      format: mapper,
      type: "text",
      editable: false,
    },
    {
      label: "Nombres",
      name: "nombres",
      format: mapper,
      type: "text",
      editable: false,
    },
    {
      label: "Apellidos",
      name: "apellidos",
      format: mapper,
      type: "text",
      editable: false,
    },
  ],
};
