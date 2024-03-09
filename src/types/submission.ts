import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface SubmissionField<TName extends string> {
  field: ControllerRenderProps<FieldValues, TName>;
}

interface SubmissionPlaceholder {
  placeholder: string;
}

export interface SubmissionTextareaProps<TName extends string>
  extends SubmissionField<TName>,
    SubmissionPlaceholder {}

export interface SubmissionInputProps<TName extends string> extends SubmissionTextareaProps<TName> {
  type?: 'text' | 'password' | 'number';
  hasPadding?: boolean;
}
