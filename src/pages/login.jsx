import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
	return (
		<div className="flex w-full h-full justify-center items-center">
			<div className="max-w-sm">
				<LoginForm />
			</div>
		</div>
	);
}

/**
 * Must return  jsx component
 * Only one parent
 * component must start with capital letter
 */
