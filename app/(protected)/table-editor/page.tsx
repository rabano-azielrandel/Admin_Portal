import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

const page = () => {
  return (
    <div className="flex justify-center items-center">
      <div>hello</div>
      <Card>
        <CardTitle>Title</CardTitle>
        <CardHeader>header</CardHeader>
      </Card>
    </div>
  );
};

export default page;
