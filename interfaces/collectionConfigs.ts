export interface CollectionConfig {
    validator: {
        $jsonSchema: {
            bsonType: string;
            required: string[];
            properties: {
                [key: string]: {
                    bsonType: string;
                    description: string;
                    pattern?: string;
                    $ref?: string;
                };
            };
        };
    };
    validationAction: string;
    validationLevel: string;
}