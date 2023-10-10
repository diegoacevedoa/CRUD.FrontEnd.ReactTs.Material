import { API } from "../../helpers/constants";
import { fetchSinToken, IFetchSinToken } from "../../helpers/fetch";
import { ICreatePersona, IUpdatePersona, ResponseAPI } from "./interfaces";

export const getAllPersonas = async () => {
  try {
    const param: IFetchSinToken = {
      endpoint: API.PERSONA_GET_ALL,
      data: {},
      method: "GET",
    };

    const response = await fetchSinToken(param);
    const body = await response.json();

    if (response.status === 200) {
      return <ResponseAPI>{
        apiCode: response.status,
        apiData: body,
        apiError: false,
        apiErrors: "",
        apiMessage: body.msg,
      };
    } else {
      return <ResponseAPI>{
        apiCode: response.status,
        apiData: null,
        apiError: true,
        apiErrors: JSON.parse(
          JSON.stringify(
            body.message.includes("Forbidden")
              ? "Usted no posee permisos para realizar esta acción. "
              : body.message
          )
        ).toString(),
        apiMessage: "",
      };
    }
  } catch (error: any) {
    console.log(error);

    return <ResponseAPI>{
      apiCode: 401,
      apiData: null,
      apiError: true,
      apiErrors:
        error != null && error.toString() === "TypeError: Failed to fetch"
          ? "El sitio no está disponible. "
          : error.toString(),
      apiMessage: "",
    };
  }
};

export const createPersona = async (item: ICreatePersona) => {
  try {
    const param: IFetchSinToken = {
      endpoint: API.PERSONA_CREATE,
      data: {
        noDocumento: item.noDocumento,
        nombres: item.nombres,
        apellidos: item.apellidos,
      },
      method: "POST",
    };

    const response = await fetchSinToken(param);
    const body = await response.json();

    if (response.status === 200) {
      return <ResponseAPI>{
        apiCode: response.status,
        apiData: body,
        apiError: false,
        apiErrors: "",
        apiMessage: body.msg,
      };
    } else {
      return <ResponseAPI>{
        apiCode: response.status,
        apiData: null,
        apiError: true,
        apiErrors: JSON.parse(
          JSON.stringify(
            body.message.includes("Forbidden")
              ? "Usted no posee permisos para realizar esta acción. "
              : body.message
          )
        ).toString(),
        apiMessage: "",
      };
    }
  } catch (error: any) {
    console.log(error);

    return <ResponseAPI>{
      apiCode: 401,
      apiData: null,
      apiError: true,
      apiErrors:
        error != null && error.toString() === "TypeError: Failed to fetch"
          ? "El sitio no está disponible. "
          : error.toString(),
      apiMessage: "",
    };
  }
};

export const updatePersona = async (item: IUpdatePersona) => {
  try {
    const param: IFetchSinToken = {
      endpoint: API.PERSONA_UPDATE.replace("{id}", item.idPersona.toString()),
      data: {
        idPersona: item.idPersona,
        noDocumento: item.noDocumento,
        nombres: item.nombres,
        apellidos: item.apellidos,
      },
      method: "PUT",
    };

    const response = await fetchSinToken(param);
    const body = await response.json();

    if (response.status === 200) {
      return <ResponseAPI>{
        apiCode: response.status,
        apiData: body,
        apiError: false,
        apiErrors: "",
        apiMessage: body.msg,
      };
    } else {
      return <ResponseAPI>{
        apiCode: response.status,
        apiData: null,
        apiError: true,
        apiErrors: JSON.parse(
          JSON.stringify(
            body.message.includes("Forbidden")
              ? "Usted no posee permisos para realizar esta acción. "
              : body.message
          )
        ).toString(),
        apiMessage: "",
      };
    }
  } catch (error: any) {
    console.log(error);

    return <ResponseAPI>{
      apiCode: 401,
      apiData: null,
      apiError: true,
      apiErrors:
        error != null && error.toString() === "TypeError: Failed to fetch"
          ? "El sitio no está disponible. "
          : error.toString(),
      apiMessage: "",
    };
  }
};

export const deletePersona = async (id: number) => {
  try {
    const param: IFetchSinToken = {
      endpoint: API.PERSONA_DELETE.replace("{id}", id.toString()),
      data: {},
      method: "DELETE",
    };

    const response = await fetchSinToken(param);
    const body = await response.json();

    if (response.status === 200) {
      return <ResponseAPI>{
        apiCode: response.status,
        apiData: body,
        apiError: false,
        apiErrors: "",
        apiMessage: body.msg,
      };
    } else {
      return <ResponseAPI>{
        apiCode: response.status,
        apiData: null,
        apiError: true,
        apiErrors: JSON.parse(
          JSON.stringify(
            body.message.includes("Forbidden")
              ? "Usted no posee permisos para realizar esta acción. "
              : body.message
          )
        ).toString(),
        apiMessage: "",
      };
    }
  } catch (error: any) {
    console.log(error);

    return <ResponseAPI>{
      apiCode: 401,
      apiData: null,
      apiError: true,
      apiErrors:
        error != null && error.toString() === "TypeError: Failed to fetch"
          ? "El sitio no está disponible. "
          : error.toString(),
      apiMessage: "",
    };
  }
};
