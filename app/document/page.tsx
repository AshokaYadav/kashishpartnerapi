export default function RechargeDoc() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">📄 Recharge API Documentation</h1>

      {/* Endpoint */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">🔗 Endpoint</h2>
        <pre className="bg-gray-100 p-3 rounded mt-2">
          POST http://api.partner.kashishindiapvtltd.com/api/recharge/recharge
        </pre>
      </section>

      {/* Headers */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">🔐 Headers</h2>
        <table className="w-full mt-2 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Key</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">client_id</td>
              <td className="p-2 border">string</td>
              <td className="p-2 border">Your provided client ID</td>
            </tr>
            <tr>
              <td className="p-2 border">client_secret</td>
              <td className="p-2 border">string</td>
              <td className="p-2 border">Your secret key</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Body */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">📦 Body (x-www-form-urlencoded)</h2>
        <table className="w-full mt-2 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Key</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">amount</td>
              <td className="p-2 border">string</td>
              <td className="p-2 border">Recharge amount (e.g., "100")</td>
            </tr>
            <tr>
              <td className="p-2 border">operatorCode</td>
              <td className="p-2 border">string</td>
              <td className="p-2 border">Operator code (e.g., "AIRTEL")</td>
            </tr>
            <tr>
              <td className="p-2 border">operatorCircle</td>
              <td className="p-2 border">string</td>
              <td className="p-2 border">Operator Circle (e.g., "RJ")</td>
            </tr>
            <tr>
              <td className="p-2 border">customerMobile</td>
              <td className="p-2 border">string</td>
              <td className="p-2 border">Customer's mobile number</td>
            </tr>
          </tbody>
        </table>
      </section>



      {/* Method */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">🔄 Method</h2>
        <p className="mt-2">POST</p>
        <p className="mt-1">
          Content-Type:{' '}
          <code className="bg-gray-200 px-2 py-1 rounded">
            application/x-www-form-urlencoded
          </code>
        </p>
      </section>

      {/* Example Request */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">✅ Example Request</h2>
        <pre className="bg-gray-100 p-3 rounded mt-2 text-sm">
          {`POST /api/recharge/recharge HTTP/1.1
            Host: api.partner.kashishindiapvtltd.com
            Content-Type: application/x-www-form-urlencoded
            client_id: YOUR_CLIENT_ID
            client_secret: YOUR_CLIENT_SECRET

            amount=100&operatorCode=AIRTEL&customerMobile=9876543210`}
        </pre>
      </section>

      {/* Success Response */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">📤 Success Response</h2>
        <pre className="bg-green-100 p-3 rounded mt-2 text-sm">
          {`{
            "status": "success",
            "message": "Recharge successful",
            "transactionId": "TXN123456"
          }`}
        </pre>
      </section>

      {/* Error Response */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">❌ Error Response</h2>
        <pre className="bg-red-100 p-3 rounded mt-2 text-sm">
          {`{
            "status": "failed",
            "message": "Invalid client credentials"
          }`}
        </pre>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold">❌ Pending Response - <span>status code: 400</span></h2>
        <pre className="bg-red-100 p-3 rounded mt-2 text-sm">
          {`{
  "status": "pending"
}`}
        </pre>
      </section>
      {/* Notes */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">📌 Notes</h2>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Make sure all values are properly URL-encoded.</li>
          <li>API expects a <code>POST</code> request only.</li>
          <li>Check the response status to determine success or failure.</li>
        </ul>
      </section>

      {/* Operator List */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">📋 Operator List</h2>
        <table className="w-full mt-2 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Operator Name</th>
              <th className="p-2 border">Operator Code</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">Airtel</td>
              <td className="p-2 border">AR</td>
            </tr>
            <tr>
              <td className="p-2 border">Jio</td>
              <td className="p-2 border">JO</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
