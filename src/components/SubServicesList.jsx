import subServices from "../data/subServices.json";

export default function SubServicesList({ services }) {
    console.log(subServices)
    return (
        <div className="max-w-md mx-auto mt-8">
            {services.map((service, index) => (
                <div key={index} className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">{service}</h2>
                    <ul>
                        {subServices[service.trim()]?.Subservices && subServices[service]?.Subservices?.map((subService, subIndex) => (
                            <li key={subIndex}>{subService}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}