import {CollectionConfig} from "../../interfaces/collectionConfigs";

export const USERS_COLLECTION_CONFIG: CollectionConfig = {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: [
                'email',
                'password',
                'firstName',
            ],
            properties: {
                email: {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                    pattern:
                        '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$',
                },
                password: {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                },
                firstName: {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                    pattern: '^[a-zA-Z\\s]{1,}$', // TODO: think it through
                },
            },
        },
    },
    validationAction: 'error',
    validationLevel: 'strict',
}

export const TASKS_COLLECTION_CONFIG: CollectionConfig = {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: [
                'type',
                'isDone',
                'user_id',
            ],
            properties: {
                type: {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                },
                description: {
                    bsonType: 'string',
                    description: 'must be a string and is optional',
                },
                isDone: {
                    bsonType: 'bool',
                    description: 'must be a boolean and is required',
                },
                user_id: {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                },
            },
        },
    },
    validationAction: 'error',
    validationLevel: 'strict',
}