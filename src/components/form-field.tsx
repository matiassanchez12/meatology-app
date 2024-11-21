import { useController } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { FormFieldProps } from "@/types/type";

const FormField: React.FC<FormFieldProps> = ({
    control,
    label,
    placeholder,
    name,
    type = 'text'
}) => {
    const { field, fieldState } = useController({
        control,
        name,
    })
    console.log(fieldState)
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View className="flex flex-col gap-1.5">
                <Label>{label}</Label>

                <Input placeholder={placeholder} type={type} value={field.value} onChangeText={field.onChange} />

                {fieldState.error && <span className="error-message">{fieldState.error.message}</span>}
            </View>
        </KeyboardAvoidingView>
    )
};
export default FormField;