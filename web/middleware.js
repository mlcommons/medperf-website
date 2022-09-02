import { NextResponse } from 'next/server';
/* eslint-disable import/prefer-default-export */

const disabledBenchmarks = process.env.NEXT_PUBLIC_DISABLE_BENCHMARKS_PAGE;

export const middleware = (request) => {
  /** Redirect /benchmarks to home unless the path is
   * `/benchmarks?preview=on` AND env variable is set
   * TODO: Remove me after release ~~
   * */
  if (request.nextUrl.pathname.startsWith('/benchmarks')) {
    const params = new URLSearchParams(request.nextUrl.search);
    if (disabledBenchmarks && !(params.get('preview') === 'on')) {
      return NextResponse.redirect(request.nextUrl.origin);
    }
  }
  return NextResponse.next();
};
