import React from 'react';
import './ApiDocs.css';

const ApiDocs = () => {
  return (
    <div className="api-docs">
      <h1>API Documentation</h1>
      <p>
        <strong>Base URL:</strong>{' '}
        <span className="base-url">http://yourdomain.com/zap-app/api</span>
      </p>

      {/* Get All Sightings */}
      <section>
        <h2>Get All Sightings</h2>
        <h3>
          <span className="endpoint-method">GET</span>
          <code className="endpoint-url">/sightings</code>
        </h3>
        <p>Retrieve a list of sightings with optional filters, sorting, and pagination.</p>

        <h4>Query Parameters:</h4>
        <table className="query-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>limit</strong></td>
              <td>integer</td>
              <td>Number of records to return (default: 10).</td>
            </tr>
            <tr>
              <td><strong>offset</strong></td>
              <td>integer</td>
              <td>Number of records to skip (default: 0).</td>
            </tr>
            <tr>
              <td><strong>sortField</strong></td>
              <td>string</td>
              <td>
                Field to sort by (default: <code>created_at</code>).
              </td>
            </tr>
            <tr>
              <td><strong>sortDirection</strong></td>
              <td>string</td>
              <td>
                <code>asc</code> or <code>desc</code> (default: <code>desc</code>).
              </td>
            </tr>
          </tbody>
        </table>

        <h4>Filters:</h4>
        <table className="query-table">
          <thead>
            <tr>
              <th>Filter</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>{'{field}_eq'}</code></td>
              <td>Exact match.</td>
            </tr>
            <tr>
              <td><code>{'{field}_gt'}</code></td>
              <td>Greater than.</td>
            </tr>
            <tr>
              <td><code>{'{field}_gte'}</code></td>
              <td>Greater than or equal.</td>
            </tr>
            <tr>
              <td><code>{'{field}_lt'}</code></td>
              <td>Less than.</td>
            </tr>
            <tr>
              <td><code>{'{field}_lte'}</code></td>
              <td>Less than or equal.</td>
            </tr>
            <tr>
              <td><code>{'{field}_like'}</code></td>
              <td>Case-insensitive partial match.</td>
            </tr>
          </tbody>
        </table>

        <h4>Filterable Fields:</h4>
        <ul className="filterable-fields">
          <li><code>id</code></li>
          <li><code>latitude</code></li>
          <li><code>longitude</code></li>
          <li><code>created_at</code></li>
          <li><code>updated_at</code></li>
          <li><code>status</code></li>
          <li><code>mortality_type</code></li>
          <li><code>fence_type</code></li>
          <li><code>road_type</code></li>
          <li><code>additional_notes</code></li>
        </ul>

        <h4>Response:</h4>
        <pre>
          <code>
            {`{
  "sightings": [
    /* Array of sighting objects */
  ],
  "totalCount": 100
}`}
          </code>
        </pre>

        <h4>Example Request:</h4>
        <pre>
          <code>
            GET <span className="base-url">/zap-app/api/sightings?limit=5&offset=10&status_eq=Dead</span>
          </code>
        </pre>
      </section>

      {/* Get Sighting By ID */}
      <section>
        <h2>Get Sighting By ID</h2>
        <h3>
          <span className="endpoint-method">GET</span>
          <code className="endpoint-url">/sightings/{'{id}'}</code>
        </h3>
        <p>Retrieve a single sighting by its ID.</p>
        <h4>URL Parameters:</h4>
        <ul>
          <li>
            <strong>id</strong> (integer): The ID of the sighting.
          </li>
        </ul>
        <h4>Response:</h4>
        <pre>
          <code>
            {`{
  /* Sighting object */
}`}
          </code>
        </pre>
        <h4>Example Request:</h4>
        <pre>
          <code>GET /zap-app/api/sightings/123</code>
        </pre>
      </section>

      {/* Create a New Sighting */}
      <section>
        <h2>Create a New Sighting</h2>
        <h3>
          <span className="endpoint-method">POST</span>
          <code className="endpoint-url">/sightings</code>
        </h3>
        <p>Create a new sighting.</p>
        <h4>Request Body (JSON):</h4>
        <pre>
          <code>
            {`{
  "photo": "base64_encoded_photo_string",
  "location": {
    "latitude": 12.345678,
    "longitude": 98.7654321
  },
  "status": "Alive",
  "mortalityType": "Road Death",
  "additionalNotes": "Optional notes here",
  "metadata": {
    "fenceType": "Electric",
    "roadType": "Highway"
  }
}`}
          </code>
        </pre>
        <h4>Response:</h4>
        <pre>
          <code>{`{ "message": "Sighting created successfully" }`}</code>
        </pre>
      </section>

      {/* Error Responses */}
      <section>
        <h2>Error Responses</h2>
        <p>
          The API uses standard HTTP status codes to indicate the success or
          failure of an API request. Error responses include a message explaining
          the reason for the error.
        </p>
        <h4>Example Error Response:</h4>
        <pre>
          <code>
            {`{
  "error": "Sighting not found"
}`}
          </code>
        </pre>
        <h4>Possible HTTP Status Codes:</h4>
        <ul>
          <li>
            <strong>200 OK</strong>: The request was successful.
          </li>
          <li>
            <strong>201 Created</strong>: A new resource was successfully created.
          </li>
          <li>
            <strong>400 Bad Request</strong>: The request was invalid or cannot be
            served.
          </li>
          <li>
            <strong>404 Not Found</strong>: The requested resource could not be
            found.
          </li>
          <li>
            <strong>500 Internal Server Error</strong>: An error occurred on the
            server.
          </li>
        </ul>
      </section>

      {/* CORS and Authentication */}
      <section>
        <h2>CORS and Authentication</h2>
        <h4>CORS Headers:</h4>
        <p>
          The API allows cross-origin requests. Ensure your client handles CORS
          properly.
        </p>
        <h4>Authentication:</h4>
        <p>
          Currently, the API does not require authentication. In the future,
          authentication mechanisms may be added.
        </p>
      </section>
    </div>
  );
};

export default ApiDocs;
