'use client'

import config from '@/constants/apiconfig';
import { useEffect, useRef, useState } from 'react';

export const useEffectOnce = (effect) => {

    const effectFn = useRef(effect);
    const destroyFn = useRef();
    const effectCalled = useRef(false);
    const rendered = useRef(false);
    const [, setVal] = useState(0);
  
    if (effectCalled.current) {
      rendered.current = true;
    }
  
    useEffect(() => {
      // only execute the effect first time around
      if (!effectCalled.current) {
        destroyFn.current = effectFn.current();
        effectCalled.current = true;
      }

      // this forces one render after the effect is run
      setVal((val) => val + 1);

      return () => {
        // if the comp didn't render since the useEffect was called,
        // we know it's the dummy React cycle
        if (!rendered.current) { return; }

        // otherwise this is not a dummy destroy, so call the destroy func
        if (destroyFn.current) { destroyFn.current(); }
      };
    }, []);
  };


const postView = async () => {
    const viewAPI = `${config.apiBaseUrl}/views`;
    const pathname = window.location.pathname;

    try {
      const response = await fetch(viewAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path_name: pathname })
      });

      if (!response.ok) {
        const responseData = await response.json(); 
        console.error('Error posting view:', responseData.message);
      }
    } catch (error) {
      console.error('Error posting view:', error.message);
    }
};
    

const useUpdateView = () => {
  useEffectOnce(() => {
    postView();
  }, []);
};

export default useUpdateView;
