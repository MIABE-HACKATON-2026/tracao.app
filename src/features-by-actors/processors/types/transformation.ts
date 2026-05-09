export interface Transformation {
    id: string;
    created_by: string;
    transformer_id: string;
    execution_type: 'self' | 'third_party';
    status: 'open' | 'locked';
    created_at: string;
}

export interface TransformationInput {
    id: string;
    transformation_id: string;
    batch_id: string;
}

export interface TransformationOutput {
    id: string;
    transformation_id: string;
    batch_id: string;
}
