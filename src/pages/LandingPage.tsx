import { Link } from 'react-router';

export default function LandingPage() {
	return (
		<main
			style={{
				alignItems: 'center',
				backgroundColor: '#f5f7fb',
				color: '#172033',
				display: 'flex',
				justifyContent: 'center',
				minHeight: '100vh',
				padding: '24px',
				textAlign: 'center',
			}}
		>
			<section style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', maxWidth: '360px', width: '100%' }}>
				<div
					aria-hidden="true"
					style={{
						alignItems: 'center',
						backgroundColor: '#2457d6',
						borderRadius: '18px',
						color: '#fff',
						display: 'flex',
						fontSize: '28px',
						fontWeight: 700,
						height: '64px',
						justifyContent: 'center',
						marginBottom: '18px',
						width: '64px',
					}}
				>
					B
				</div>
				<h1 style={{ fontSize: '30px', margin: '0 0 36px' }}>Banking made simpler</h1>

				<Link
					to="/login"
					style={{
						backgroundColor: '#2457d6',
						borderRadius: '8px',
						boxSizing: 'border-box',
						color: '#fff',
						fontSize: '16px',
						fontWeight: 600,
						padding: '14px 20px',
						textDecoration: 'none',
						width: '100%',
					}}
				>
					Log in
				</Link>
				<p style={{ color: '#596579', fontSize: '14px', margin: '22px 0 12px' }}>
					New here?{' '}
					<a href="/signup" style={{ color: '#2457d6', fontWeight: 600, textDecoration: 'none' }}>
						Sign up
					</a>
				</p>
				<Link to="/home" style={{ color: '#596579', fontSize: '14px', textDecoration: 'underline' }}>
					Continue as guest
				</Link>
			</section>
		</main>
	);
}
