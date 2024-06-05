import { useCallback, useEffect, useState } from "react";

interface IChangeForm {
  id: string;
  value: string;
}

export const useForm = <
  IS extends Object,
  ISV extends Object,
  VM extends Object
>(
  initialState: IS,
  initialStateValidations: ISV,
  validationMessages: VM,
  validate = false
) => {
  const [formValues, setFormValues] = useState(initialState);
  const [validationValues, setValidationValues] = useState(
    initialStateValidations
  );
  const [valid, setValid] = useState(false);

  useEffect(() => {
    resultValidations();
  }, [validationValues]);

  const resultValidations = useCallback(() => {
    let isvalid = true;

    if (validate) {
      for (const [_, value] of Object.entries(validationValues)) {
        if (value.invalid) {
          isvalid = false;
        }
      }
    }

    setValid(isvalid);
  }, [validationValues]);

  const reset = useCallback(
    (newFormState = initialState) => {
      setFormValues(newFormState);
    },
    [initialState]
  );

  const triggerValidation = useCallback(() => {
    let isvalid = true;

    if (validate) {
      const validationsList = [];

      for (const [id, value] of Object.entries(formValues)) {
        if (validationValues[id as keyof typeof validationValues]) {
          validationsList.push(updateValidationMultiple({ id, value }));
        }
      }

      if (validationsList.length > 0) {
        const cloneObj: ISV = {} as ISV;
        validationsList.forEach((element) => {
          if (element && element.id) {
            let str: string =
              '{"' + element.id + '":' + JSON.stringify(element.value) + "}";

            Object.assign(cloneObj, JSON.parse(str));

            if (element.value.invalid) {
              isvalid = false;
            }
          }
        });

        setValidationValues(cloneObj);
      }
    }

    return isvalid;
  }, [formValues]);

  const updateValidationMultiple = useCallback(
    ({ id = "", value = "" }: IChangeForm) => {
      if (validate && validationValues[id as keyof typeof validationValues]) {
        if (
          value === "" ||
          value === " " ||
          value === "-1" ||
          value === null ||
          value?.toString().trim() === ""
        ) {
          return {
            id: id.toString(),
            value: {
              invalid: true,
              message:
                validationMessages[id as keyof typeof validationMessages],
            },
          };
        } else {
          return { id: id.toString(), value: { invalid: false, message: "" } };
        }
      }
    },
    [validationValues]
  );

  const updateValidation = useCallback(
    ({ id = "", value = "" }: IChangeForm) => {
      if (validate && validationValues[id as keyof typeof validationValues]) {
        if (
          value === "" ||
          value === " " ||
          value === "-1" ||
          value === null ||
          value?.toString().trim() === ""
        ) {
          setValidationValues({
            ...validationValues,
            [id]: {
              invalid: true,
              message:
                validationMessages[id as keyof typeof validationMessages],
            },
          });
        } else {
          setValidationValues({
            ...validationValues,
            [id]: {
              invalid: false,
              message: "",
            },
          });
        }
      }
    },
    [validationValues]
  );

  const handleChange = useCallback(
    ({ id = "", value = "" }: IChangeForm) => {
      updateValidation({ id, value });

      setFormValues((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    },
    [formValues]
  );

  return {
    formValues,
    validationValues,
    valid,
    handleChange,
    triggerValidation,
    reset,
  };
};
