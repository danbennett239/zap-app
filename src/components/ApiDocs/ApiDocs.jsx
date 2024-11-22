import React from 'react';
import './ApiDocs.css';

const ApiDocs = () => {
  return (
    <div className="api-docs">
      <h1>API Documentation</h1>
      <p>
        <strong>Base URL:</strong> <code>http://yourdomain.com/zap-app/api</code>
      </p>

      <section>
        <h2>Get All Sightings</h2>
        <h3>GET <code>/sightings</code></h3>
        <p>
          Retrieve a list of sightings with optional filters, sorting, and pagination.
        </p>
        <h4>Query Parameters:</h4>
        <ul>
          <li>
            <strong>limit</strong> (integer, optional): Number of records to return (default: 10).
          </li>
          <li>
            <strong>offset</strong> (integer, optional): Number of records to skip (default: 0).
          </li>
          <li>
            <strong>sortField</strong> (string, optional): Field to sort by (default: <code>created_at</code>).
          </li>
          <li>
            <strong>sortDirection</strong> (string, optional): <code>asc</code> or <code>desc</code> (default: <code>desc</code>).
          </li>
          <li>
            <strong>Filters:</strong> Apply filters using the following patterns:
            <ul>
              <li>
                <code>{'{field}_eq'}</code>: Exact match.
              </li>
              <li>
                <code>{'{field}_gt'}</code>: Greater than.
              </li>
              <li>
                <code>{'{field}_gte'}</code>: Greater than or equal.
              </li>
              <li>
                <code>{'{field}_lt'}</code>: Less than.
              </li>
              <li>
                <code>{'{field}_lte'}</code>: Less than or equal.
              </li>
              <li>
                <code>{'{field}_like'}</code>: Case-insensitive partial match.
              </li>
            </ul>
            Filterable fields:
            <ul>
              <li>
                <code>id</code>
              </li>
              <li>
                <code>latitude</code>
              </li>
              <li>
                <code>longitude</code>
              </li>
              <li>
                <code>created_at</code>
              </li>
              <li>
                <code>updated_at</code>
              </li>
              <li>
                <code>status</code>
              </li>
              <li>
                <code>mortality_type</code>
              </li>
              <li>
                <code>fence_type</code>
              </li>
              <li>
                <code>road_type</code>
              </li>
              <li>
                <code>additional_notes</code>
              </li>
            </ul>
          </li>
        </ul>
        <h4>Response:</h4>
        <pre>
          <code>
{`{
  "sightings": [ /* Array of sighting objects */ ],
  "totalCount": 100
}`}
          </code>
        </pre>
      </section>

      {/* Repeat similar structure for other endpoints */}
    </div>
  );
};

export default ApiDocs;
