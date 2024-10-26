import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        id: '',
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        temporaryPassword: true,
        realmRoles: [''],
        clientRoles: [''],
        attributes: [{ id: 0, key: '', values: [''] }],
        state: '',
        creationTime: 0,
        lastLoginAt: 0,
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const [field, index, subField] = name.split('.');

        if (field === 'attributes') {
            const updatedAttributes = [...formData.attributes];
            if (subField) {
                updatedAttributes[index][subField] = value;
            } else {
                updatedAttributes[index] = { ...updatedAttributes[index], key: value };
            }
            setFormData({
                ...formData,
                attributes: updatedAttributes,
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value,
            });
        }
        console.log(formData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        axios.post(
            'https://api.playground.usecustos.org/api/v1/user-management/user?client_id=custos-kgap8hu6ih4hddvlzzlb-10000000',
            {
                "id": "98765423212SS221",
                "username": "12312",
                "firstName": "Ja214S2n2e2",
                "lastName": "SmS21i4t22h2",
                "password": "12312",
                "email": "jane.s212m5iSth@example.com",
                "temporaryPassword": true,
                "realmRoles": [
                  "user"
                ],
                "clientRoles": [
                  "editor"
                ],
                "attributes": [
                  {
                    "id": 1,
                    "key": "location",
                    "values": [
                      "New York"
                    ]
                  }
                ],
                "state": "active",
                "creationTime": 1640995200000,
                "lastLoginAt": 1643654400000
              },
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer eyJraWQiOiItVkxaa25kaGY0dVhEMkp6VXk3N0Jla2VqZTJfQUlUZEhyNVhLUFdUYXVRIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhYjJmMWI5Zi05ZmE4LTQ5MDUtOWUwZi1hMjY1ZTVjOWYzNTkiLCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCIsImh0dHA6Ly9hcGkucGxheWdyb3VuZC51c2VjdXN0b3Mub3JnIiwiaHR0cDovL2xvY2FsaG9zdDo1MTczIiwiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sImlzcyI6Imh0dHBzOi8vMTAwMDAwMDAudXNlY3VzdG9zLm9yZyIsInR5cCI6IkJlYXJlciIsInByZWZlcnJlZF91c2VybmFtZSI6Inp5YW4zMTlAZ2F0ZWNoLmVkdSIsInNpZCI6ImRiYWI0YjNmLTgyZmYtNDFjNy05Y2IwLTAyNzYxYjljNjBlMCIsImFjciI6IjAiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy0xMDAwMDAwMCIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sImF6cCI6ImN1c3Rvcy1rZ2FwOGh1NmloNGhkZHZsenpsYi0xMDAwMDAwMCIsImF1dGhfdGltZSI6MTcyOTg5MDQ4MSwic2NvcGUiOiIiLCJleHAiOjE3Mjk4OTg0NzksInNlc3Npb25fc3RhdGUiOiJkYmFiNGIzZi04MmZmLTQxYzctOWNiMC0wMjc2MWI5YzYwZTAiLCJpYXQiOjE3Mjk4OTY2NzksImp0aSI6IjY0NzU4Y2FmLTk4YTEtNGI2MC1iY2E5LWQ1NDFkOWI0YWQ5ZCIsImVtYWlsIjoienlhbjMxOUBnYXRlY2guZWR1IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJncm91cHMiOltdLCJnaXZlbl9uYW1lIjoiWmhpeGlhbmciLCJhdWQiOiJhY2NvdW50IiwibmFtZSI6IlpoaXhpYW5nIFlhbiIsInNjb3BlcyI6W10sImZhbWlseV9uYW1lIjoiWWFuIn0.rUkZG0tIL0jal7aKUA3sS4j8wm95beVfBJ6llYe2ozT7L6ozepjH53R_TmNG8gcdeVwDc1zGf_cfHzLUacRBB8tQ7WT51yBxY21AW3UCa6WEeVkSaeOUMhzCC5m5zZ0NrTZaAeEpxVYDv61-ZLR1hbKigo1_cxuoFtA8Hblpzmnau2aePuDosRTXFw7nnV8DLMIbqdjGt07lGPWty89dCmS-B43Oa85_idp1kupHeqLYEKRO-hjSKG4ryicLoIHDoU9IIKh9orfLZmjjy7urK0RjyTTmJj56C07rihR9-QM9jKYkneM8PcSOz5Dh5xQTJqRqNyqrBgAdW8at5odXSg',
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => {
            console.log('User created successfully:', response.data);
        })
        .catch(error => {
            console.error('There was an error creating the user!', error);
        });
    };
    return (
        <div className="">
            <form onSubmit={handleSubmit} className="">
                <div>
                    <label htmlFor="id">ID:</label>
                    <input type="text" id="id" name="id" placeholder="ID" value={formData.id} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="temporaryPassword">Temporary Password:</label>
                    <input type="checkbox" id="temporaryPassword" name="temporaryPassword" checked={formData.temporaryPassword} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="realmRoles">Realm Roles:</label>
                    <input type="text" id="realmRoles" name="realmRoles" placeholder="Realm Roles" value={formData.realmRoles} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="clientRoles">Client Roles:</label>
                    <input type="text" id="clientRoles" name="clientRoles" placeholder="Client Roles" value={formData.clientRoles} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="attributesKey">Attribute Key:</label>
                    <input type="text" id="attributesKey" name="attributes.0.key" placeholder="Attribute Key" value={formData.attributes[0].key} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="attributesValue">Attribute Value:</label>
                    <input type="text" id="attributesValue" name="attributes.0.values.0" placeholder="Attribute Value" value={formData.attributes[0].values[0]} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="state">State:</label>
                    <input type="text" id="state" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="creationTime">Creation Time:</label>
                    <input type="number" id="creationTime" name="creationTime" placeholder="Creation Time" value={formData.creationTime} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="lastLoginAt">Last Login At:</label>
                    <input type="number" id="lastLoginAt" name="lastLoginAt" placeholder="Last Login At" value={formData.lastLoginAt} onChange={handleChange} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;