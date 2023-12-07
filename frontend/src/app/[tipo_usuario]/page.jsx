'use client'

import LoadingGif from "@/components/LoadingGIF";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function page({ params }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 150);
    return () => clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return (<LoadingGif />)
  }

  if (params.tipo_usuario) {
    return (
      <div>
        <h2>Página principal</h2>
        <p>{`PARAM: ${params.tipo_usuario}`}</p>
      </div>
    )

  }
}