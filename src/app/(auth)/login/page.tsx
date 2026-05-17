import Link from "next/link"
import LoginForm from "../_components/login-form"
import { Header } from "../_components/header"
export default function LoginPage() {
	return (
		<>
<Header  title="login"/>
<LoginForm />
				<p className="mt-6 text-center text-sm text-slate-500">
					Don&apos;t have an account?{" "}
					<Link href="/register" className="font-medium text-blue-600 hover:underline">
						Create one
					</Link>
				</p>



		</>
	)
}
