
import AppLayout from '@/components/layout/AppLayout';
import AIChatBox from '@/components/chat/AIChatBox';

const Chat = () => {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">AI Math Tutor</h1>
          <p className="text-muted-foreground">
            Chat with our AI tutor to get help with math concepts and problems
          </p>
        </div>
        
        <AIChatBox />
      </div>
    </AppLayout>
  );
};

export default Chat;
