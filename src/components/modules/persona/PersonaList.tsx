import { useMemo, useEffect, useCallback } from "react";
import {
  deletePersona,
  getAllPersonas,
  mapHeadPersona,
} from "../../../api/persona";
import Table from "../../ui/table";
import Swal from "sweetalert2";
import Loading from "../../ui/loading";
import { IDataPersona, ResponseAPI } from "../../../api/persona/interfaces";
import EditarIcon from "../../ui/icons/EditarIcon";
import EliminarIcon from "../../ui/icons/EliminarIcon";

interface IPersonaList {
  loading: boolean;
  setLoading: Function;
  setTitleModal: Function;
  setIsNewModal: Function;
  setShowModal: Function;
  setActiveForm: Function;
  allData: IDataPersona[];
  setAllData: Function;
}

export const PersonaList = ({
  loading = false,
  setLoading,
  setTitleModal,
  setIsNewModal,
  setShowModal,
  setActiveForm,
  allData,
  setAllData,
}: IPersonaList) => {
  useEffect(() => {
    handleGetAllPersonas();
  }, []);

  const handleEdit = useCallback(
    (item: IDataPersona) => {
      setTitleModal("Editar Registro");
      setIsNewModal(false);
      setShowModal(true);
      setActiveForm(item);
    },
    [allData]
  );

  const handleDelete = useCallback(
    (id: number) => {
      Swal.fire({
        title: "Confirmación!",
        text: "Está seguro de querer eliminar el registro?",
        icon: "warning",
        showConfirmButton: true,
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          handleDeletePersona(id);
        }
      });
    },
    [allData]
  );

  const handleGetAllPersonas = useCallback(async () => {
    setLoading(true);

    const response: ResponseAPI = await getAllPersonas();

    if (response.apiError) {
      Swal.fire(
        "Error",
        response.apiMessage + " " + (response.apiErrors ?? ""),
        "error"
      );

      setAllData([]);
    } else if (response.apiData != null && response.apiData.data.length > 0) {
      const list: IDataPersona[] = response.apiData.data.map(
        (item: IDataPersona) => {
          return {
            idPersona: item.idPersona,
            noDocumento: item.noDocumento,
            nombres: item.nombres,
            apellidos: item.apellidos,
          };
        }
      );

      setAllData(list);
    } else {
      Swal.fire("Advertencia", "La consulta no retornó registros. ", "warning");

      setAllData([]);
    }

    setLoading(false);
  }, []);

  const handleDeletePersona = useCallback(
    async (id: number) => {
      setLoading(true);

      const response: ResponseAPI = await deletePersona(id);

      if (response.apiError) {
        Swal.fire(
          "Error",
          response.apiMessage + " " + (response.apiErrors ?? ""),
          "error"
        );
      } else {
        Swal.fire(
          "OK!",
          "El registro se ha eliminado exitosamente.",
          "success"
        );

        const newList: IDataPersona[] = allData.filter(
          (item) => item.idPersona !== id
        );

        setAllData(newList);
      }

      setLoading(false);
    },
    [allData]
  );

  const getColums = useMemo(() => {
    return mapHeadPersona.columns.map((column) => {
      return {
        key: column.name,
        header: column.label,
        render: (row: IDataPersona) => {
          if (column.name === "acciones") {
            return (
              <div>
                <EditarIcon
                  width="20"
                  height="20"
                  alt="Añadir nuevo"
                  title="Añadir nuevo"
                  tabIndex={1}
                  onClick={() => handleEdit(row)}
                />
                <EliminarIcon
                  width="20"
                  height="20"
                  alt="Eliminar"
                  title="Eliminar"
                  tabIndex={2}
                  onClick={() => handleDelete(row.idPersona)}
                />
              </div>
            );
          }

          if (!column.editable) {
            for (const [id, value] of Object.entries(row)) {
              if (id === column.name) {
                return value;
              }
            }
          }
        },
      };
    });
  }, [allData]);

  return (
    <>
      <Table data={allData} columns={getColums} />
      <Loading show={loading} />
    </>
  );
};
