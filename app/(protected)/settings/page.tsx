import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';

export default async function Page() {
  const session = await auth();
  const handleSignOut = async () => {
    'use server';
    await signOut();
  };
  return (
    <div>
      {JSON.stringify(session)}
      <Button onClick={handleSignOut}>SignOut</Button>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        {' '}
        <button>Sign Out</button>
      </form>
    </div>
  );
}
