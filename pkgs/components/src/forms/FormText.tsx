import React from "react"
import { useFormContext } from "react-hook-form"
import { ErrorText } from "../text"
import { TextInput, TextInputProps } from "../inputs"
import { Column } from "../layouts"
import { FormInputProps, getDefaultErrorMessage } from "./FormInput"

export type FormTextProps = FormInputProps<string> & TextInputProps

export const FormText = ({
    name,
    defaultValue,
    optional,
    rules,
    errorTooltipPlacement,
    errorMessage,
    label,
    inputProps,
    transform,
    ...rest
}: FormTextProps) => {
    const {
        register,
        setValue,
        formState: { errors, touchedFields }
    } = useFormContext()
    if (defaultValue && !(name in touchedFields)) {
        setValue(name, defaultValue)
    }
    return (
        <Column align="center">
            <TextInput
                label={label ?? name}
                inputProps={{
                    ...inputProps,
                    ...register(name, {
                        required: !optional,
                        ...rules,
                        setValueAs: transform
                    })
                }}
                {...rest}
            />
            <div style={{ height: 20 }}>
                {errors?.[name] ? (
                    <ErrorText tooltipPlacement={errorTooltipPlacement}>
                        {errorMessage
                            ? typeof errorMessage === "function"
                                ? errorMessage(errors[name])
                                : errorMessage
                            : getDefaultErrorMessage(errors[name])}
                    </ErrorText>
                ) : null}
            </div>
        </Column>
    )
}
