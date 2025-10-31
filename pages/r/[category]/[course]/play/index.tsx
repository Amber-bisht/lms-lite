import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllCourses, getCourseByName } from '../../../../../lib/dataUtils';

export default function LegacyCoursePlayRedirect() {
  return null;
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const courses = getAllCourses();

    const paths = courses.map((course) => ({
      params: {
        category: course.coursecategory.toLowerCase(),
        course: course.courseName,
      },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error generating static paths for legacy course play redirects:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const categoryName = (params?.category as string).toLowerCase();
    const courseName = params?.course as string;

    const course = getCourseByName(categoryName, courseName);

    if (!course) {
      return {
        notFound: true,
        revalidate: 60,
      };
    }

    const teacherSlug = course.instructorSlug || course.teacherId || course.instructorname;

    return {
      redirect: {
        destination: `/teacher/${encodeURIComponent(teacherSlug)}/${encodeURIComponent(course.courseName)}/play`,
        permanent: true,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error handling legacy course play redirect:', error);
    return {
      notFound: true,
      revalidate: 60,
    };
  }
};

