import { Control, ControllerProps } from "react-hook-form";
import { TouchableOpacityProps } from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
    title: string;
    bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
    textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
    IconLeft?: any;
    IconRight?: any;
    className?: string;
}

interface FormFieldProps {
    name: string;
    control: any;
    label: string;
    placeholder: string;
    type?: string;
}