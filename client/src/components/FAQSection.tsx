import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  return (
    <section className="max-w-4xl mx-auto mt-16 mb-12" id="faq">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Frequently Asked Questions</h2>
      
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="item-1" className="bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm border">
          <AccordionTrigger className="px-6 py-4 font-bold text-gray-700">
            How does the Ghibli style transformation work?
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-white border-t border-gray-100 text-gray-600">
            Our app uses advanced AI algorithms trained on Studio Ghibli's iconic art style. 
            It analyzes your image's composition, color palette, and details, then applies 
            transformation techniques to recreate the dreamy, hand-painted quality that makes 
            Ghibli films so distinctive.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2" className="bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm border">
          <AccordionTrigger className="px-6 py-4 font-bold text-gray-700">
            What types of images work best?
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-white border-t border-gray-100 text-gray-600">
            Landscapes, nature scenes, and architectural photos typically yield the best results. 
            Images with good lighting, clear subjects, and not too many complex details will transform 
            more effectively. Ghibli films often feature scenic vistas, magical environments, and 
            charming buildings, so similar subjects in your photos will transform beautifully.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3" className="bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm border">
          <AccordionTrigger className="px-6 py-4 font-bold text-gray-700">
            Is there a limit to how many images I can transform?
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-white border-t border-gray-100 text-gray-600">
            Free accounts can transform up to 5 images per day. Premium subscribers enjoy unlimited 
            transformations, higher resolution outputs, and access to special style variations inspired 
            by different Ghibli films like "Spirited Away," "Princess Mononoke," and "My Neighbor Totoro."
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4" className="bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm border">
          <AccordionTrigger className="px-6 py-4 font-bold text-gray-700">
            What happens to my uploaded images?
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-white border-t border-gray-100 text-gray-600">
            We respect your privacy. Your original images and transformations are stored securely for 
            7 days to allow you to download them, after which they are automatically deleted from our 
            servers. We never use your images for training our AI or share them with third parties without 
            your explicit permission.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
