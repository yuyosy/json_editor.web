// json-editor/docs/recursive.html
// https://github.com/json-editor/json-editor/blob/master/docs/recursive.html

schema = {
    title: "Person",
    $ref: "#/definitions/person",
    definitions: {
        person: {
            type: "object",
            id: "person",
            // The object will start with only these properties
            defaultProperties: [
                "fname",
                "lname",
                "bestFriend",
                "coworkers"
            ],
            patternProperties: {
              // Self-referntial schema in patternProperties
              "^cousin_[0-9]+$": {
                $ref: "#/definitions/person"
              }
            },
            properties: {
                fname: {
                    title: "first name",
                    type: "string"
                },
                lname: {
                    title: "last name",
                    type: "string"
                },
                bestFriend: {
                  title: "best friend",
                  oneOf: [
                    {
                      title: "none",
                      type: "null"
                    },
                    // Self-referential schema as 2nd choice in oneOf
                    {
                      title: "person",
                      $ref: "#/definitions/person"
                    }
                  ]
                },
                coworkers: {
                  type: "array",
                  // Self-referential schema in array items
                  items: {
                    title: "Coworker",
                    $ref: "#/definitions/person"
                  }
                },
                // Self-referential schemas in non-default properties
                mother: {
                  title: "mother",
                  $ref: "#/definitions/person"
                }
            }
        },
        year: {
            type: "integer",
            pattern: "^[0-9]{4}$",
            minimum: 1900,
            maximum: 2100
        }
    }
}

