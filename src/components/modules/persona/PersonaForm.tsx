import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  FormEvent,
} from "react";
import {
  ICreatePersona,
  IDataPersona,
  IUpdatePersona,
  ResponseAPI,
} from "../../../api/persona/interfaces";
import Modal from "../../ui/modal";
import Loading from "../../ui/loading";
import Button from "../../ui/button";
import GuardarIcon from "../../ui/icons/GuardarIcon";
import SalidaIcon from "../../ui/icons/SalidaIcon";
import Swal from "sweetalert2";
import { createPersona, updatePersona } from "../../../api/persona";
import { useForm } from "../../../hooks/useForm";
import Field from "../../ui/field";
import { Container, Grid } from "@mui/material";

interface IPersonaForm {
  titleModal: string;
  isNewModal: boolean;
  showModal: boolean;
  setShowModal: Function;
  activeForm: IDataPersona;
  allData: IDataPersona[];
  setAllData: Function;
}

interface IValidation {
  invalid: boolean;
  message: string;
}

interface IValidations {
  noDocumento: IValidation;
  nombres: IValidation;
  apellidos: IValidation;
}

interface IValidationMessages {
  noDocumento: string;
  nombres: string;
  apellidos: string;
}

const defaultValidation: IValidation = {
  invalid: false,
  message: "",
};

const defaultValidationValues: IValidations = {
  noDocumento: defaultValidation,
  nombres: defaultValidation,
  apellidos: defaultValidation,
};

const validationMessages: IValidationMessages = {
  noDocumento: "El No Documento es requerido.",
  nombres: "Los Nombres son requeridos.",
  apellidos: "Los Apellidos son requeridos.",
};

export const PersonaForm = ({
  titleModal = "",
  isNewModal = false,
  showModal = false,
  setShowModal,
  activeForm,
  allData,
  setAllData,
}: IPersonaForm) => {
  const [loadingModal, setLoadingModal] = useState(false);

  const {
    formValues,
    validationValues,
    handleChange,
    triggerValidation,
    reset,
  } = useForm<IDataPersona, IValidations, IValidationMessages>(
    activeForm,
    defaultValidationValues,
    validationMessages,
    true
  );

  //Guarda un valor mutable
  const activeId = useRef(activeForm.idPersona);

  //Mostrar los datos en pantalla cada que seleccionan una registro diferente a la inicial
  useEffect(() => {
    //Si id cambia, entonces se renderiza el compononte de y se hace esto para evitar ciclo infinito
    if (activeForm.idPersona !== activeId.current) {
      reset(activeForm);
      activeId.current = activeForm.idPersona;
    }
  }, [activeForm, reset]);

  const handleOnSaveModal = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!triggerValidation()) {
        return;
      }

      if (isNewModal) {
        handleCreatePersona();
      } else {
        handleUpdatePersona();
      }
    },
    [triggerValidation]
  );

  const handleCreatePersona = async () => {
    setLoadingModal(true);

    const data: ICreatePersona = {
      noDocumento: formValues.noDocumento,
      nombres: formValues.nombres,
      apellidos: formValues.apellidos,
    };

    const response: ResponseAPI = await createPersona(data);

    if (response.apiError) {
      Swal.fire(
        "Error",
        response.apiMessage + " " + (response.apiErrors ?? ""),
        "error"
      );
    } else {
      Swal.fire("OK!", "El registro se ha creado exitosamente.", "success");

      const newData: IDataPersona = {
        idPersona: response.apiData.idPersona,
        noDocumento: formValues.noDocumento,
        nombres: formValues.nombres,
        apellidos: formValues.apellidos,
      };

      setAllData([newData, ...allData]);
    }

    setLoadingModal(false);
    setShowModal(false);
  };

  const handleUpdatePersona = async () => {
    setLoadingModal(true);

    const data: IUpdatePersona = {
      idPersona: formValues.idPersona,
      noDocumento: formValues.noDocumento,
      nombres: formValues.nombres,
      apellidos: formValues.apellidos,
    };

    const response: ResponseAPI = await updatePersona(data);

    if (response.apiError) {
      Swal.fire(
        "Error",
        response.apiMessage + " " + (response.apiErrors ?? ""),
        "error"
      );
    } else {
      Swal.fire(
        "OK!",
        "El registro se ha actualizado exitosamente.",
        "success"
      );

      const newList: IDataPersona[] = allData.map((item) =>
        item.idPersona === formValues.idPersona ? formValues : item
      );

      setAllData(newList);
    }

    setLoadingModal(false);
    setShowModal(false);
  };

  const handleOnCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const getBodyModal = useMemo(() => {
    return (
      <div className="container-fluid">
        <form id="formPersona" onSubmit={handleOnSaveModal} noValidate>
          <div className="row">
            <div className="col-4">
              <Field
                id="noDocumento"
                name="noDocumento"
                type="text"
                label="No Documento"
                value={formValues.noDocumento}
                placeHolder="Ingrese No Documento"
                tabIndex={1}
                required
                disabled={loadingModal}
                autoFocus={false}
                autoComplete="off"
                error={validationValues.noDocumento.message}
                isInvalid={validationValues.noDocumento.invalid}
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <Field
                id="nombres"
                name="nombres"
                type="text"
                label="Nombres"
                value={formValues.nombres}
                placeHolder="Ingrese Nombres"
                tabIndex={2}
                required
                disabled={loadingModal}
                autoFocus={true}
                autoComplete="off"
                error={validationValues.nombres.message}
                isInvalid={validationValues.nombres.invalid}
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <Field
                id="apellidos"
                name="apellidos"
                type="text"
                label="Apellidos"
                value={formValues.apellidos}
                placeHolder="Ingrese Apellidos"
                tabIndex={3}
                required
                disabled={loadingModal}
                autoFocus={true}
                autoComplete="off"
                error={validationValues.apellidos.message}
                isInvalid={validationValues.apellidos.invalid}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }, [formValues, validationValues]);

  const getFooterModal = useMemo(() => {
    return (
      <Grid
        container
        direction="row"
        alignItems={"center"}
        justifyContent={"flex-end"}
      >
        <Button
          className="mb-btn-secondary"
          variant={"outlined"}
          color={"primary"}
          size={"medium"}
          disabled={loadingModal}
          tabIndex={4}
          onClick={handleOnCloseModal}
          icon={<SalidaIcon width="1em" height="1em" />}
          type="button"
        >
          Cerrar
        </Button>
        <Button
          className="mb-btn-primary"
          variant={"contained"}
          color={"primary"}
          size={"medium"}
          disabled={loadingModal}
          tabIndex={5}
          icon={<GuardarIcon width="1em" height="1em" />}
          type="submit"
          form="formPersona"
        >
          Guardar
        </Button>
      </Grid>
    );
  }, []);

  return (
    <>
      {showModal && (
        <Modal
          body={getBodyModal}
          foot={getFooterModal}
          head={titleModal}
          onClose={handleOnCloseModal}
          show={showModal}
          size="lg"
        />
      )}
      <Loading show={loadingModal} />
    </>
  );
};
