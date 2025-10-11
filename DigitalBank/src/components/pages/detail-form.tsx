import { Link } from 'react-router-dom';

export default function DetailForm({ title, fields, buttons }: any) {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex md:flex-row flex-col items-center justify-between gap-4 mb-6">
        <h3 className="text-2xl font-semibold tracking-tight text-purple-700">{title}</h3>
        <div className="flex items-center justify-end gap-2">
          {buttons?.map((button: any) => (
            <Link
              key={button.id}
              to={button.to}
              className="cursor-pointer border border-purple-300 px-4 py-2 rounded-md text-sm text-purple-700 hover:bg-purple-50 transition"
            >
              {button.text}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
        {fields?.map((field: any) => (
          <div key={field.id} className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">{field.label}</label>
            <div className="bg-gray-100 text-gray-800 border border-gray-300 rounded px-3 py-2">
              {field.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}