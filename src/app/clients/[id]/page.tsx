import ClientEditor from './ClientEditor'

interface ClientPageProps {
  params: {
    id: string
  }
}

export default function ClientPage({ params }: ClientPageProps) {
  return <ClientEditor id={params.id} />
}
