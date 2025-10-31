export default function MyInput({ type = "text", placeholder,style, ...rest}) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`w-full px-4 py-2 border border-gray-300 rounded ${style}`}
            {...rest}
        />
    );
}
